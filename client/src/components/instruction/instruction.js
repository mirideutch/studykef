// import React from "react";

// export default function Instruction(){

//     return(
//         <>
//             <h1>באו נתחיל</h1>
//             <p>לימוד האותיות מדורג לשלבים, כאשר בכל שלב מצטרפת אות חדשה ולאחר מכן משחקי התרגול הינם על האותיות שנלמדו עד לשלב זה. </p>
//             <h2>איך מתחילים?</h2>
//             <p>ראשית, עליכם ללמוד את האות החדשה בשלב, בדף זה תלמדו אות גדולה וקטנה חזותית ושמיעתית וכן מילים המתחילות באות.  </p>
//             <h2>מה עם התרגול?</h2>
//             <p>בכל שלב ישנם 4 משחקי תרגול</p>
//         </>
//     )
// }
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ScrollDialog(props) {
//   const [open, setOpen] = React.useState(false);
  const {open, setOpen}= props
  const [scroll, setScroll] = React.useState('paper');

//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//   };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" style={{textAlign:'right'}}>הוראות</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')} */}
              <div style={{textAlign:'center'}}>
              <h1>באו נתחיל</h1>
             <p>לימוד האותיות מדורג לשלבים, כאשר בכל שלב מצטרפת אות חדשה ולאחר מכן משחקי התרגול הינם על האותיות שנלמדו עד לשלב זה. </p>
             <h2>איך מתחילים?</h2>
             <p>ראשית, עליכם ללמוד את האות החדשה בשלב, בדף זה תלמדו אות גדולה וקטנה חזותית ושמיעתית וכן מילים המתחילות באות.  </p>
             <h2>מה עם התרגול?</h2>
             <p>בכל שלב ישנם 4 משחקי תרגול</p>
             <br></br><br></br>
             <p>לימוד האותיות מדורג לשלבים, כאשר בכל שלב מצטרפת אות חדשה ולאחר מכן משחקי התרגול הינם על האותיות שנלמדו עד לשלב זה. </p>
             <h2>איך מתחילים?</h2>
             <p>ראשית, עליכם ללמוד את האות החדשה בשלב, בדף זה תלמדו אות גדולה וקטנה חזותית ושמיעתית וכן מילים המתחילות באות.  </p>
             <h2>מה עם התרגול?</h2>
             <p>בכל שלב ישנם 4 משחקי תרגול</p>
             <p>לימוד האותיות מדורג לשלבים, כאשר בכל שלב מצטרפת אות חדשה ולאחר מכן משחקי התרגול הינם על האותיות שנלמדו עד לשלב זה. </p>
             <h2>איך מתחילים?</h2>
             <p>ראשית, עליכם ללמוד את האות החדשה בשלב, בדף זה תלמדו אות גדולה וקטנה חזותית ושמיעתית וכן מילים המתחילות באות.  </p>
             <h2>מה עם התרגול?</h2>
             <p>בכל שלב ישנם 4 משחקי תרגול</p>

             {/* {"plkjhbgvcxzsdfgthyujkil/;.,mnbvcdxszZxcvbhjkl;poiuytrewazXCVBNM,./SDFGHJKLZXCVBNM,.ASDFGHJKzXCVBNMqwertyuiopzxcvbnm,.sdfghjkl"} */}
             </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}