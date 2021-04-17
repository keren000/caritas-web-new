import React from 'react';
import { StateProvider } from '../../modules/StateContext';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../../modules/styles/theme';
import { Dialog,DialogContent,DialogActions, Grid, Button} from '@material-ui/core'
import Main from "../../pages/payment/Main"
import FormStyles from '../../pages/payment/Form/FormStyles'
import CloseIcon from '@material-ui/icons/Close';

const Payment = (props) => 
   <ThemeProvider theme={theme}>
    <StateProvider>
      <Dialog
        open={props.open}
        onClose={props.onclose}
        >
        <DialogContent>
        <FormStyles>
          <Main close={props.close} paymentId={props.paymentId} handleNewCard={props.handleNewCard} addCardWIthoutSaving={props.addCardWIthoutSaving} />
        </FormStyles> 
        <Grid container justify="flex-end">
          <Button onClick={props.close} color="primary">
            <CloseIcon />
          </Button>
        </Grid>          
        </DialogContent>
      </Dialog>
    </StateProvider>
  </ThemeProvider>


export default Payment;