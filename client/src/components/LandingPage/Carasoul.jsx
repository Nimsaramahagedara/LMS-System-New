import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import MiddleBarOnCarasoul from './MiddleBarOnCarasoul';

export const Carasoul = (props) => {
    const [carouselHeight, setCarouselHeight] = useState(600);

    const handleResize = () => {
        // Adjust the height based on screen width or any other condition
        const newHeight = window.innerWidth > 600 ? 600 : 300;
        setCarouselHeight(newHeight);
    };

    useEffect(() => {
        // Attach the resize event listener when the component mounts
        window.addEventListener('resize', handleResize);

        // Detach the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    var items = [
        {
            src: "https://live.staticflickr.com/65535/53370602114_7011b87686_z.jpg"
        },
        {
            src: "https://live.staticflickr.com/65535/53370602129_e1eb9a7d81_z.jpg"
        }
    ]

    return (
        <div className='relative'>
        <Carousel height={carouselHeight}  indicatorContainerProps={{ style: { display: 'none' } }}>
            {
                items.map((item, i) => <img src={item.src} className='w-full h-full object-cover' key={i} />)
            }
        </Carousel>
        <MiddleBarOnCarasoul/>
        </div>
    )
}

// function Item(props) {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }