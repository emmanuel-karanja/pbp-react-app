import React ,{Component} from 'react';

//uses a service worker to allow the document to be loaded in a separate
//thread to prevent the screen from freezing as the document loads for better UX

import { Document,Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PropTypes from 'prop-types';
//import sampleResume from './resume1.pdf';



//this simplistic component renders the pdf documents
//it has two nav-style button because most pdf docs will often be more than one
//page. The buttons allows easy navigation from page to page

const DocLoading=(props)=>{
  return(
   <div className="d-flex justify-content-center">
     <div className="spinner-border" role="status">
      <strong>Loading resume...</strong>
    </div>
  </div>
  );
}

export default class PdfViewer extends Component{
   constructor(props){
   super(props);
   this.state={
      numPages:null, 
      pageNumber:1,
      prevEnabled:true,
      nextEnabled:true}; 
 }

  onDocumentLoadSuccess=({numPages})=>{
     this.setState({numPages:numPages});
   }

  toPrevPage=()=>{
     this.setState(state=>({pageNumber: this.state.pageNumber-1}));
  }
  toNextPage=()=>{
    this.setState(state=>({pageNumber:this.state.pageNumber+1}));
  }

  render(){
   const {numPages,pageNumber,nextEnabled,prevEnabled}=this.state;
   //documentUrl is a required prop string that will be the url string for the document.
   //it'll most likely be fetched from an S3 bucket in a production implementation
   const {documentUrl}=this.props;
   
   return(
    <div>
     <nav>
       <button className="btn btn-outline-info btm-sm" onClick={this.toPrevPage} disabled={!prevEnabled}>Prev</button>  
       <button className="btn btn-outline-info btm-sm" onClick={this.toNextPage} disabled={!nextEnabled}>Next</button>
     </nav>
      <div style={{width: '100%'}}>
         <Document
           file={documentUrl}
           onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber}/>
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