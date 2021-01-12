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
     showForm:false,
    }
  onContentChange=e=>{
    this.setState({content: e.target.value});
  }

  resetForm(){
     this.setState({content:''});
  }

  toggleForm=()=>{
    this.setState({showForm: !showForm});
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
      return(
       <button className="btn btn-info" onClick={this.toggleForm}>
            + Add Comment
        </button>
       {this.state.showForm &&
         <form onSubmit={this.onCreateComment}>
          <input  
            onChange={this.onContentChange}
            value={this.state.content}
            type="text"
            placeholder="...write a comment"
          />
          <button className="btn btn-primary" type="submit">
           Save Comment
          </button>
         </form>
        }
     );
    }
}

///the mandatory createComment prop function
AddCommentForm.propTypes={
   createComment: PropTypes.func.isRequired,
}