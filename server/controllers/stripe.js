import User from '../models/user';
import Stripe from 'stripe';
import queryString from 'query-string';
import Hotel from '../models/hotel';
import Order from '../models/order'

const stripe=Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async(req, res)=>{

     const user =await User.findById(req.user._id).exec();
     console.log("USER===>",user);
     if (!user.stripe_account_id){
         const account = await stripe.accounts.create({
             type: "standard",
             
         });
         console.log("ACCOUNT===>", account );
         user.stripe_account_id= account.id;
         user.save();
    }
     let accountLink = await stripe.accountLinks.create({
         account: user.stripe_account_id,
         refresh_url:process.env.STRIPE_REDIRECT_URL,
         return_url:process.env.STRIPE_REDIRECT_URL,
         type: "account_onboarding",
     });

     accountLink = Object.assign(accountLink,
         {
         "stripe_user[email]": user.email || undefined,
     });
    //  console.log("ACCOUNT LINK", accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log(link);
    res.send(link);
 };


 export const getAccountStatus = async (req, res) => {
    //  console.log('GET ACCOUNT STATUS');
    const user = await User.findById(req.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id)
    // console.log('USER ACCOUNT RETRIVE', account);
    const updatedUser = await User.findByIdAndUpdate(user._id, 
        {stripe_seller: account,}, 
        {new: true} 
        ).select("-password")
        .exec();
        // console.log(updatedUser); 
        res.json(updatedUser);
    
 };
 
 export const getAccountBalance = async (req, res) =>{
    const user = await User.findById(req.user._id).exec();

    try{
        const balance = await stripe.balance.retrieve({
           stripeAccount: user.stripe_account_id,
        });
        
        res.json(balance);    
    }catch(err) {
        console.log(err)
    }

 };

 export const stripeSessionId = async (req, res) =>{
    //  console.log("You hit stripe session id ", req.body.hotelId);

    const {hotelId}= req.body;

    const item = await Hotel.findById(hotelId).populate("postedBy").exec();

    const fee= (item.price * 20)/100;

     const session = await stripe.checkout.sessions.create({
         payment_method_types:["card"],
         line_items:[
             {
                 name: item.title,
                 amount: item.price*100,
                 currency: "inr",
                 quantity: 1,
             },
         ],

         payment_intent_data: {
             application_fee_amount: fee * 100,
             transfer_data:{
                    destination: item.postedBy.stripe_account_id,
             },
         },

         success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
         cancel_url: process.env.STRIPE_CANCEL_URL,

        });

     await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec()
     res.send({
         sessionId: session.id,
     })
 };

 export const StripeSuccess= async(req,res) =>{
     try{
        const {hotelId} = req.body;

        const user = await User.findById(req.user._id).exec();

        if(!user.stripeSession) return;
   
        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
   
        if(session.payment_status === "paid"){  
            const orderExist = await Order.findOne({"session.id": session.id}).exec();
            if(orderExist){
                res.json({success: true});
            } else{
                let newOrder = await new Order({
                    hotel: hotelId,
                    session,
                    orderedBy: user._id,
                }).save();
   
                await User.findByIdAndUpdate(user._id,{
                    $set:{stripeSession: {} },
                });
                res.json({ success: true});
            }
            } 
     } catch(err){
         console.log('STRIPE SUCCESS ERR')
     }

 };