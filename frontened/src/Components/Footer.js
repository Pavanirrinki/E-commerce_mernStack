import React from 'react'
import "./Footer.css"
import { GrLocation} from 'react-icons/gr'
import { FiPhoneCall} from 'react-icons/fi'
import { MdEmail} from 'react-icons/md'
function Footer() {
    return (
        <><footer>
            <div className='footer-section'>

                <div class="cta-text">
                    <div style={{display:"flex"}}>
                <GrLocation style={{margin:"4px",fontSize:"30px"}}/>
                    <h4>Find us</h4>
                    </div>
                    <span style={{marginLeft:"40px"}}>1010 Avenue, sw 54321, chandigarh</span>
                </div>


                <div class="cta-text">
                <div style={{display:"flex"}}>
                <FiPhoneCall style={{margin:"4px",fontSize:"30px",color:"black"}}/>
                    <h4>Call us</h4>
                    </div>
                    <span style={{marginLeft:"40px"}}>9876543210 0</span>
                </div>


                <div class="cta-text">
                <div style={{display:"flex"}}>
                <MdEmail style={{margin:"4px",fontSize:"30px",color:"black"}}/>
                    <h4>Mail us</h4>
                    </div>
                    <span style={{marginLeft:"40px"}}>mail@info.com</span>
                </div>
            </div>
            <hr style={{ color: "blue", border: "2px solid red", marginBottom: "20px" }} />


<div className='footer-section'>
<div>
            <div class="footer-logo">
                <a href="index.html">
                    <img src="https://i.ibb.co/QDy827D/ak-logo.png" class="img-fluid" alt="logo" /></a>
            </div>
            <div class="footer-text">
                <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.</p>
            </div>
 </div>
<div>
    <h6 style={{textAlign:"center",}}>Useful Links</h6>
   <div style={{display:"flex",justifyContent:"space-around"}}>
    <ul style={{display:"flex",flexDirection:"column",color:"white",listStyleType:"none",justifyContent:"flex-start"}}>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Emailid</li>
        <li>Facebook</li>
        <li>Twitter</li>
    </ul>
    <ul style={{display:"flex",flexDirection:"column",color:"white",listStyleType:"none",justifyContent:"flex-start"}}>
        <li>Instagram</li>
        <li>Whatsapp</li>
        <li>Youtube</li>
        <li>Careers</li>
        <li>Home</li>
    </ul>
    </div>
</div>
{/* subscribe note */}
<div>
    <h6 style={{textAlign:"center"}}>Subscribe</h6>
   <div style={{display:"flex",justifyContent:"space-around"}}>
    <ul style={{display:"flex",flexDirection:"column",color:"white",listStyleType:"none"}}>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
    </ul>
    <ul style={{display:"flex",flexDirection:"column",color:"white",listStyleType:"none"}}>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
    </ul>
    </div>
</div>
 </div>
 </footer> 
 {/* copy-right area  */}
 <div className='copyright-area'>
  <p>pavan kumar</p>
 </div> </>
    )
}

export default Footer
