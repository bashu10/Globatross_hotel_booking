import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {Card, Avatar, Badge} from 'antd';
import moment from 'moment';
import {getAccountBalance} from '../actions/stripe';



const {Meta}= Card;
const {Ribbon}=Badge;

const ConnectNav= () => {
    const [balance, setBalance]= useState(0)
    const {auth} =useSelector((state)=>({...state}));
    const {user} =auth;

    useEffect(()=>{
        getAccountBalance(auth.token).then(res=>{
            // console.log(res);
            setBalance(res.data);
        });
    }, []);

    return(
        <div className="d-flex justify-content-around">
            <Card>
                    <Meta 
                    avatar={<Avatar>{user.name[0]}</Avatar>} 
                    title={user.name}
                    description={`Joined ${moment(user.createdAt).fromNow()}`} />
            </Card>
            {auth && 
            auth.user && 
            auth.user.stripe_seller && 
            auth.user.stripe_seller.charges_enabled &&(<>

            <Ribbon text="Avaliable" color="grey">

                <Card className="bg-light pt-1">
                    {balance && balance.pending && balance.pending.map((bp, i)=>(
                        <span key={i} className="lead">
                           {bp.amount} {bp.currency}
                        </span>
                    ))}
                </Card>

            </Ribbon>
            
            </>
            )}

        </div>
    );
};

export default ConnectNav;