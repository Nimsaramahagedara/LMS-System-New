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
            src: 'https://img.freepik.com/free-psd/back-school-facebook-cover-banner-template_106176-2848.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699142400&semt=ais'
        },
        {
            src: 'https://images.template.net/wp-content/uploads/2017/02/09154009/school-banners2.jpg'
        }
    ]

    return (
        <Carousel height={carouselHeight}>
            {
                items.map((item, i) => <img src={item.src} className='w-full h-full object-cover' key={i} />)
            }
        </Carousel>
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