import {DatePicker, Select} from 'antd';
import moment from "moment" ;

const {Option}=Select;

const HotelEditForm= ({
    values, 
    setValues, 
    handleChange, 
    handleImageChange, 
    handleSubmit
    }) => {

    const {title, content, price,location, bed, from, to}= values;

    return(

        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label className="btn btn-outline-secondary btn-block m-2 text-left">
                    Image
                    <input 
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        hidden
                     />
                </label>

                    <input 
                        type="text" 
                        name="title" 
                        onChange={handleChange} 
                        placeholder="Title" 
                        className="form-control m-2" 
                        value={title} 
                    />

                    <textarea 
                         
                        name="content" 
                        onChange={handleChange} 
                        placeholder="content" 
                        className="form-control m-2" 
                        value={content} 
                    />

                    <input 
                        name="location"
                        className="form-control ml-2 mr-2 " 
                        onChange={handleChange} 
                        placeholder="location" 
                        style={{height:"50px"}}
                        value={location} 
                    />

                    <input 
                        type="number" 
                        name="price" 
                        onChange={handleChange} 
                        placeholder="Price" 
                        className="form-control m-2" 
                        value={price} 
                    />

                    <Select 
                    onChange={(value)=> setValues({...values, bed: value })} 
                    className="w-100 m-2" 
                    size="large" 
                    placeholder="Number of beds"
                    value={bed}
                    >
                        <Option key={1}>{1}</Option>
                        <Option key={2}>{2}</Option>2
                        <Option key={3}>{3}</Option>
                        <Option key={4}>{4}</Option>

                    </Select>
            </div>
            {from && (
                <DatePicker 
                    defaultValue={moment(from,"YYYY-MM-DD")}
                    placeholder="From Date" 
                    className="form-control m-2" 
                    onChange={(date, dateString)=> setValues({...values, from: dateString}) } 
                    disabledDate={(current)=> current && current.valueOf()< moment().subtract(1, 'days')}
                />
            )}
            
            {to && (
                <DatePicker
                    defaultValue={moment(to,"YYYY-MM-DD")} 
                    placeholder="To Date" 
                    className="form-control m-2" 
                    onChange={(date, dateString)=> setValues({...values, to: dateString}) }  
                    disabledDate={(current)=> current && current.valueOf()< moment().subtract(1, 'days')}
                />
            )}

            <button className="btn btn-outline-primary m-2">Save</button>
        </form>
       
    
    ); 
};
export default HotelEditForm;