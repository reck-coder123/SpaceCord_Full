import styles from "./styles.module.css";
import { useEffect } from "react";
import {Link} from 'react-router-dom';
import lgon from './logo.jpg'
import landing from './LandingPgImg.png'
import img1 from './Icon1.png'
import img2 from './Icon2.png'
import img3 from './Icon3.png'
import img4 from './Icon4.png'
import img5 from './Icon5.png'
import img6 from './Icon6.png'
import Aos from "aos";
import 'aos/dist/aos.css'

  

const Home=()=>{
  useEffect(()=>{
    Aos.init({duration:2000});
  },[]);
    return (
        <div style={{background:'black'}}>
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark" style={{background:"#000"}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src={lgon} alt="logo" height="80px" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{width:'100%',display:'flex', justifyContent:'flex-end', gap:'60px', position:'relative', right:'3%'}}>
              <li className="nav-item" style={{alignItems:'end'}}>
                <Link className= {`${styles.nav_link} ${styles.nav_link_ltr} nav_link ${styles.active} nav_link_ltr `} aria-current="page" to="/">About Us</Link>
              </li>
              <li className="nav-item" style={{alignItems:'end'}}>
                <Link className={`${styles.nav_link} ${styles.nav_link_ltr} nav_link nav_link_ltr `} to="/">Explore</Link>
              </li>
              <li className="nav-item" style={{alignItems:'end'}}>
                <Link className={`${styles.nav_link} ${styles.nav_link_ltr} nav_link nav_link_ltr`} to="/feeds">Feeds</Link>
              </li>
              <li className="nav-item" style={{alignItems:'end'}}>
                <Link className={`${styles.nav_link} ${styles.nav_link_ltr} nav_link nav_link_ltr `} to="/">Team</Link>
              </li>
            </ul>
            {/* <!-- <span className="navbar-text">
              Navbar text with an inline element
            </span> --> */}
          </div>
        </div>
      </nav>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.static_txt}>A place for those who </h1><br />
        <ul className={styles.dynamic_txt}>
          <li><span style={{margin:'2px 0px', lineHeight:'70px'}}>WISH</span></li>
          <li><span style={{margin:'2px 0px', lineHeight:'70px'}}>DREAM</span></li>
          <li><span style={{margin:'2px 0px', lineHeight:'70px'}}>ENDEAVOUR</span></li>
          <li><span style={{margin:'2px 0px', lineHeight:'70px'}}>EMPOWER</span></li>
        </ul><br />
        <h1 className={styles.static_txt}>to make a change</h1>
      <div className="d-grid gap-2 d-md-block" style={{position:'absolute' ,top:'75%', width:'260px'}}>
        <Link to="/signup"><button className="btn btn-primary sign-btn" type="button" style={{background:'#B055F8'}}>Sign Up</button></Link>
        <Link to="/login"><button className="btn btn-outline-primary log-btn" type="button" style={{position:'relative',left:'40px'}}>Log in</button></Link>
      </div>
      
        </div>
        <div className={styles.sideimg}><img src={landing} alt='img'/></div>
      {/* <!-- <div><img src="LandingPgImg.png" height="640px" width="640px"></div> --> */}
      <div className={styles.domain}><p style={{color:'#fff',display:'inline', textAlign:'center', padding:'10px 107px', backgroundBlendMode:'lighten'}}>#aero</p><p>#astro</p><p>#physics</p><p>#research</p></div>
    </div>
    <div className={styles.content1}>
    <h1 className={`${styles.about} ${styles.reveal}`} data-aos="fade-up">About Us</h1>  <hr/>
    <p>We are <span>Spacecord</span> , an organisation that is developing a scientific and technical open-source writing,
       upskilling and project-sharing platform for all. The goal of this problem is to encourage young people 
       to engage in scientific topics and technical projects in a collaborative community environment. We start with 
       <span>Aerospace, Astronomy and Physics </span>research areas.</p>
      </div>
       <div className={styles.content2}>
        <div className={`${styles.sixPointers} ${styles.reveal}`}data-aos="fade-up" ><h5 style={{color:'#fff', fontSize: '35px', width:'20%', margin:'auto', backgroundImage:'linear-gradient(45deg,#B055F8,#fff)'}} >The 6 point philosophy</h5></div>
       
        <div className={`${styles.pointers} ${styles.odd} ${styles.reveal}`} data-aos="fade-up"><img src={img1} alt="Arrow"/>
          <span>Encouraging </span>young people to engage with scientific concepts and ideas. A platform for young people to write about and discuss scientific topics. <hr/><div className={styles.circle1}></div></div>
          <div className={`${styles.pointers} ${styles.even} ${styles.reveal}`} data-aos="fade-up"><img src={img2} alt="Feathers"/>
           <span> Promotiong </span>the importance of scientific literacy: we intend to help foster a love of learning and a desire to keep exploring. <hr/><div className={styles.circle2}></div></div>
          <div className={`${styles.pointers} ${styles.odd} ${styles.reveal}`} data-aos="fade-up"><img src={img3} alt="Compass"/>
           <span> Empowerment and self direction: </span>Enables users to learn new skills and share their projects, thereby empowering individuals to take control of their own learnig and professional development. <hr/><div className={`${styles.circle1} ${styles.three}`}></div></div>
          <div className={`${styles.pointers} ${styles.even} ${styles.reveal}`} data-aos="fade-up"><img src={img4} alt="Users"/>
           <span> Supporting </span> the next generation of thinkers and innovators. By aiding in documenting their open source contributions. <hr/><div className={styles.circle2}></div></div>
          <div className={`${styles.pointers} ${styles.odd} ${styles.reveal}`} data-aos="fade-up"><img src={img5} alt="eye"/>
           <span>Inclusivity, Accessibility and Diversity :</span> As an open source platform, we make resources and opportunities available to anyone who is learning and growing. <hr/><div className={styles.circle1}></div></div>
          <div className={`${styles.pointers} ${styles.even} ${styles.reveal}`} data-aos="fade-up"><img src={img6} alt="Shapes"/>
           <span>Collaboration and community:</span> Our platform intends to foster a sense of community and encourages users to work together and support one another inmutual learnig and development. <hr/><div className={`${styles.circle2} ${styles.three}`}></div></div>
       
       

      </div>

         {/* {
          window.addEventListener('scroll',()=>{
            var reveals = document.querySelectorAll(`${styles.reveal}`);
          
            for(var i = 0; i < reveals.length; i++){
          
              var windowheight = window.innerHeight;
              var revealtop = reveals[i].getBoundingClientRect().top;
              var revealpoint = 150;
          
              if(revealtop < windowheight - revealpoint){
                reveals[i].classList.add(`${styles.active}`);
              }
              else{
                reveals[i].classList.remove(`${styles.active}`);
              }
            }
          })
          
          
         }  */}
      
      
        </div>
    )
}

export default Home;