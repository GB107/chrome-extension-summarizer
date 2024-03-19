import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage(props: any) {

    const [summary, setSummary] = React.useState<Object>({});

    const sendData = async (data: any, index: number) => {
        console.log(JSON.stringify(data), "data");
        try {
          const response = await fetch('http://localhost:3000/getdata', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers if needed
            },
            body: JSON.stringify({"data" :data}),
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
      
          const responseData = await response.json();
          setSummary({...{summary}, index: responseData.data})
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };

  // Call the function to send data

  return (
    <div>
      {props.data.map((item: any, index: number) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
            onClick={() => sendData(item, index)}  
          >
            {item}
          </AccordionSummary>
          <AccordionDetails>
            {summary[index]}
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
