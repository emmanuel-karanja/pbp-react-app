import React, {Component} from 'react';
import PropTypes from 'prop-types';

//a very simple form for adding comments to Resumes, but applicable elsewhere
//for a more advanced form, formik and yup would be used for validation and handling
//form local state

export default class AddCommentForm extends Component{
  constructor(props){
    super(props);
    //ephemeral local state required by the form
    this.state={
     content:'',
    }
  }
  onContentChange=e=>{
    this.setState({content: e.target.value});
  }

  resetForm=()=>{
     this.setState({content:''});
  }

  onCreateComment=e=>{
      //prevent default submit behavior
      e.preventDefault();
      //use the prop function to make the call, let the container component handle the API call
      this.props.createComment({
        content:this.state.content,
        date: new Date()
      });
    this.resetForm();
   }
   render(){
      const {content}=this.state;
      return(       
        <div>
         <form onSubmit={this.onCreateComment}>
          <input  
            onChange={this.onContentChange}
            value={content}
            type="text"
            placeholder="...write a comment"
          />
          
          <button className="btn btn-primary btn-sm" type="submit">
               + Add
          </button>
         </form>  
        </div> 
      );
   }
   
}

///the mandatory createComment prop function
AddCommentForm.propTypes={
  createComment:PropTypes.func.isRequired,
}