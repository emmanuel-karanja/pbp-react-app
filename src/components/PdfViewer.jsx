import React ,{Component} from 'react';

//uses a service worker to allow the document to be loaded in a separate
//thread to prevent the screen from freezing as the document loads for better UX
import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import PropTypes from 'prop-types';
//import sampleResume from './resume1.pdf';



//this simplistic component renders the pdf documents
//it has two nav-style button because most pdf docs will often be more than one
//page. The buttons allows easy navigation from page to page

export default class PdfViewer extends Component{
   constructor(props){
   super(props);
   this.state={numPages:null, pageNumber:1}; 
 }

  onDocumentLoadSuccess=({numPages})=>{
     this.setState({numPages});
   }

  toPrevPage=()=>{
     this.setState(state=>({pageNumber: this.state.pageNumber-1}));
  }
  toNextPage=()=>{
    this.setState(state=>({pageNumber:this.state.pageNumber+1}));
  }

  render(){
   const {numPages,pageNumber}=this.state;
   //documentUrl is a required prop string that will be the url string for the document.
   //it'll most likely be fetched from an S3 bucket in a production implementation
   const {documentUrl}=this.props;
   return(
    <div>
     <nav>
       <button className="btn btn-outline-info btm-sm" onClick={this.toPrevPage}>Prev</button>  
       <button className="btn btn-outline-info btm-sm" onClick={this.toNextPage}>Next</button>
     </nav>
      <div style={{width: 500}}>
         <Document
           file={documentUrl}
           onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} width={500}/>
         </Document>
         <small className="badge badge-secondary">
            Page {pageNumber} of {numPages}
         </small>
      </div>  
    </div>
   );
  }
}

//prop types for prop validation
PdfViewer.propTypes={
    documentUrl: PropTypes.string.isRequired,
 }