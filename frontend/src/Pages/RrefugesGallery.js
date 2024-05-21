import {React, useState } from 'react'
import Navtab from '../Components/Navtab'
import Breadcrumb from '../Components/Breadcrumb'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {BiSolidRightArrow} from 'react-icons/bi'
import {BiSolidLeftArrow} from 'react-icons/bi'
import {FaWindowClose} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import {BiChevronLeft} from 'react-icons/bi'
import axios from 'axios';
import { useEffect } from 'react';

// const images = [
//     "../Images/adventure1.jpg",
//     "../Images/adventure2.jpg",
//     "../Images/adventure3.jpg",
//     "../Images/adventure4.jpg",
//     "../Images/adventure5.jpg",
//     "../Images/adventure6.jpg"
// ]

const RrefugesGallery = () => {

    const [images ,setImages] = useState([]);

    const [data, setData] = useState({ img: '',i:0 });

    useEffect (()=>{
  
        axios.get(`${process.env.REACT_APP_HOST_URL}/gallery/getAllRefuge`)
        .then((response)=>{
        //  console.log(response.data);
        //  console.log(response.data.people);
        //  console.log(response.data.people);
        
        setImages(response.data.refuge);
        })
        .catch((error)=>{
         console.log(error);
        })
      
      },[])

    const viewImage = (img, i) =>{
         setData({img, i})
    };

    const imgAction = (action) => {

        let i = data.i + 1;
        let j = data.i

         if(action ==='next-img'){
            if(i < images.length){
            setData({img: images[i].imgRefuge, i: i});
           // console.log(images[i].imgPeople);
          // console.log(images.length);
            }
            else{
            setData({img: images[0].imgRefuge, i: 0})
            }
         //  console.log(i);
            
        }
        if(action === 'previous-img'){

            console.log(i);
            if(i === 1){
                setData({img: images[images.length - 1].imgRefuge, i: images.length - 1});
         //  console.log(images.length);
        //    if(i === images.length ){
        //     setData({img: images[i-1].imgPeople, i: 4})
            }
            else{
                setData({img: images[j-1].imgRefuge, i: j-1});
            }
            
        }
        if(!action){
            setData({img: '', i: 0});
        }
    }

  return (
   <>
            <div className='main-wrapper'>
<section className='gallery-wrapper'>
   <div className='gallery-inner-wrapper'>
    <Navtab/>
   <div className='gallery-head-wrapper'>
            <h3>Refuges Gallery</h3>
            <Breadcrumb
            title='Refuges Gallery'
            />
         </div>
         <div className='img-forest-wrapper'>   
                <img src='./Images/pineforest.png' alt='pineforest'/>
           </div>
            <div className='img-slider-wrapper'>   
                <img src='./Images/slidermask.png' alt='slidermask'/>
           </div>     
   </div>
</section>
<section className='refuge-gallery-wrrapper'>
 <div className='container-xxl'>
 { data.img &&
                   <div className='gallery-popup'> 
                   <button onClick={() => imgAction()}  className='btnclose'
                   style={{ }}
                   ><FaWindowClose className='icon-close'/></button>
                    <button
                     onClick={() => imgAction('previous-img')} className='btn-prev'
                    ><BiSolidLeftArrow className='icon-control'/></button>
                      <img alt="tt" src={`${process.env.REACT_APP_HOST_URL}/gallery/`+data.img} 
                      style={{width: 'auto', maxWidth: '90%',maxHeight: '90%' }}
                      />
                      <button  onClick={() => imgAction('next-img')} className='btn-next'><BiSolidRightArrow className='icon-control'/></button>
                   </div>
                } 

                   <div className='gallery-inner-head-wrapper'>
                    <h5>Refuge</h5><Link to='/gallery'><BiChevronLeft/>Album list</Link>
                </div>      
           

           <div className='gallery-img' style={{padding: '10px'}}>
           <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter = "20px" >
                    {images.map((image, i) => (
                        <img
                            key={i}
                            src={`${process.env.REACT_APP_HOST_URL}/gallery/`+image.imgRefuge}
                            style={{ width: "350px", height: "250px", display: "block", cursor:'pointer' }}
                            alt="immmmg"
                            onClick ={() => viewImage(image.imgRefuge, i)}
                        />
                    ))}
                </Masonry>
            </ResponsiveMasonry>
           </div>
 </div>
</section>
</div>
   </>
  )
}

export default RrefugesGallery
