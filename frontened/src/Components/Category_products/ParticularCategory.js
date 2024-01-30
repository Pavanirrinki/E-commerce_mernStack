import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Data from '../../Data/Data.js';
import { useNavigate } from 'react-router-dom';


function ParticularCategory() {
  const [particularcategorydata, setparticularcategorydata] = useState(false);
  const [categoryindex, setCategoryindex] = useState(null)
  const { ParticularCategory } = useParams();
  const part = Data[ParticularCategory][0].products?.map((data) => data);

  const navigate = useNavigate()



  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {ParticularCategory !== 'FASHION'
        ? part?.map((category) => {
          return (

            <div key={category} style={{ display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/searchcategoryproducts/${category}`)}>
              <img
                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                alt="category-pic"
                style={{ height: '100px', width: '100px', borderRadius: '50%', margin: '0 auto' }} />
              <ul style={{ listStyleType: 'none' }}>
                <li>{category}</li>
              </ul>
            </div>

          );
        })
        : !particularcategorydata
          ? Data[ParticularCategory]?.map((category, index) => {
            return (

              <div key={index} style={{ display: 'flex', flexDirection: 'column' }} onClick={() => { setparticularcategorydata(true); setCategoryindex(index) }}>
                <img
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                  alt="category-pic"
                  style={{ height: '100px', width: '100px', borderRadius: '50%', margin: '0 auto' }}
                />
                <ul style={{ listStyleType: 'none' }}>
                  <li>{category.category}</li>
                </ul>
              </div>

            );
          })
          : Data[ParticularCategory][categoryindex].products?.map((category) => {
            return (

              <div key={category} style={{ display: 'flex', flexDirection: 'column' }} onClick={() => navigate(`/searchcategoryproducts/${category}`)} >
                <img
                  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                  alt="category-pic"
                  style={{ height: '100px', width: '100px', borderRadius: '50%', margin: '0 auto' }}
                />
                <ul style={{ listStyleType: 'none' }}>
                  <li>{category}</li>
                </ul>
              </div>

            )
          }
          )}
    </div>
  );
}

export default ParticularCategory;
