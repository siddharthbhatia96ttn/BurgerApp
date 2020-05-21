import React, {useState,useEffect} from 'react';
import Modal from '../../components/ui/modal/Modal';
import Aux from '../aux/Aux';
import useHttpErrorHandler from '../../hooks/HttpErrorHandeller';

const withErrorHandeller=(WrappedComponent,axios)=>{
  return (props) => {
  const [error,clearError]=useHttpErrorHandler(axios);
      return(
        <Aux>
        <Modal
        show={error}
        modalClosed={clearError}>
        {error ? error.message:null}
        Something didn't work!
        </Modal>
        <WrappedComponent {...props}/>
        </Aux>
      );
  };
};

export default withErrorHandeller;
