import React,{useState} from 'react'
import { Grid, makeStyles, Button, Dialog, DialogTitle, Container, DialogActions } from '@material-ui/core';
import {
        FacebookShareButton,
        FacebookIcon,
        TwitterShareButton,
        TwitterIcon,
        TelegramShareButton,
        TelegramIcon,
        WhatsappShareButton,
        WhatsappIcon,
        LinkedinShareButton,
        LinkedinIcon, 
        LineShareButton,
        LineIcon
  } from 'react-share';
  import { CopyToClipboard } from 'react-copy-to-clipboard'
  import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden'
    },
    form: {
        color:'#fff',
        background:'dark'
    },
   
}));


export default function UploadDialog(props) {
    const classes = useStyles();
    const [isCopied, setIsCopied] = useState(false);

    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      };
    
    const message = "I just donated to this cause. Please join me in supporting on this link "
    return (
        <Dialog
           fullWidth={true}
           maxWidth='sm'
           open={props.open}
           onClose={props.onClose}
        >
            <DialogTitle>Share Project with:</DialogTitle>
           

                <Container>
                    <Grid container spacing={2} justify="center">
                        <FacebookShareButton url={props.URL} quote={message} >
                            <FacebookIcon  size={32} round={true}/>
                        </FacebookShareButton>
                        <TwitterShareButton url={props.URL} title={message} >
                            <TwitterIcon  size={32} round={true} />
                        </TwitterShareButton>
                        <TelegramShareButton url={props.URL} title={message} >
                           <TelegramIcon  size={32} round={true}/>
                        </TelegramShareButton>
                       <WhatsappShareButton url={props.URL} title={message} >
                           <WhatsappIcon  size={32} round={true}/>
                        </WhatsappShareButton>
                       <LinkedinShareButton url={props.URL} title={message} >
                           <LinkedinIcon  size={32} round={true}/>
                        </LinkedinShareButton>
                        <LineShareButton url={props.URL} title={message} >
                           <LineIcon  size={32} round={true}/>
                        </LineShareButton>
                        <CopyToClipboard text={props.URL} onCopy={onCopyText} style={{padding: '3px'}}>
                            <span>{isCopied ? "Copied!" : <FileCopyIcon  />}</span>
                        </CopyToClipboard>
                    </Grid>
                    
                </Container>
                <DialogActions>
                    <Button onClick={props.close} style={{color:'black'}}>
                        Close
                    </Button>
                </DialogActions>
           
        </Dialog>
    )
}

