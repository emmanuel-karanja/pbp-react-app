import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import PdfViewer from './PdfViewer';
import AddCommentForm from './AddCommentForm';
import axios from 'axios';
import equal from 'fast-deep-equal';


const CommentList=({comments})=>{
    console.log(`comment list comments: ${comments}`);
    var list=[];
    if(Array.isArray(comments)){
        list=comments.map(c=><li key={c.id} className="list-group-item list-group-item-info">
            <small>posted on: <span className="badge badge-secondary"> {c.date.toString()}</span></small>
            <br/> {c.content}</li>);
    }
    return(
        <ul className="list-group" style={{width:500}}>
          {list.length>0? list: null}  
        </ul>
    );
}

CommentList.propTypes={
    comments:PropTypes.array.isRequired,
}

//this is a container for the PdfViewer and the AddCommentForm
export default class ResumeViewer extends Component{
    constructor(props){
        super(props);
        this.state={
            hasError:false,
            error:"",
            comments:[]
        }
    }

    componentDidMount(){
        const{candidate}=this.props;
        //load comments
        this.loadComments(candidate.resumeId);
    }

    //make sure to reload the comments when the selected candidate changes
    componentDidUpdate(prevProps){
        const{candidate}=this.props;
         if(!equal(candidate,prevProps.candidate)){
             this.loadComments(candidate.resumeId);
         }
    } 

    //load comments
    loadComments=(resumeId)=>{  
        axios.get(`http://localhost:5000/resumes/${resumeId}?_embed=comments`)
             .then(res=>{
                 //let filteredComments=res.data.comments.filter(c=>c.resumeId===resumeId);
                 //do date formatting
                 var comments=res.data.comments;
                 comments.forEach(comment=>{
                     if(comment.date){
                         comment.date=new Date(comment.date);
                     }
                 });
                 this.setState({comments:comments,hasError:false});   
             }).catch(error=>{
                 this.setState({hasError:true,error:error.message});
                 console.log(error);
             })
    }
    //create a new comment
    addComment=(comment)=>{
        const {candidate}=this.props;
        //add the resume id to the new comment
        let newComment={...comment, resumeId:candidate.resumeId};
        axios.post('http://localhost:5000/comments',newComment)
            .then(res=>{
                //comment added successfully
                this.setState({hasError:false})
                this.loadComments(candidate.resumeId);
                console.log(res);
            }).catch(error=>{
                console.log(error);
                this.setState({hasError:true,error:error.message});
            });
        
    }

    render(){
        const {candidate}=this.props;
        const {hasError,error,comments}=this.state;
        //construct the document URL
        const resumeUrl=`http://localhost:5000/sample_resumes/resume${candidate.resumeId}.pdf`;
        return(
            <div>
                {hasError && <div className="alert alert-danger" role="alert">
                                  Could not load resume comments, an error occured: {error}
                       </div>}
                {candidate && <div>
                    <h2 className="mb-1">Resume for <strong>{candidate.firstname+' '+candidate.lastname}</strong></h2>
                    <PdfViewer documentUrl={resumeUrl}/>
                    <p className="mb-1">Comments </p>
                     {comments && <CommentList comments={comments}/>}
                    <AddCommentForm createComment={this.addComment}/>
                    </div>
                }
               
            </div>
        );
    }
}

ResumeViewer.propTypes={
    candidate:PropTypes.object.isRequired,
}