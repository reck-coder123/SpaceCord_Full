import styles from "./styles.module.css";
import {Link} from 'react-router-dom';
import logo from './LogoNoBG.png'
import spacelogo from './SpacecordBIG.png'
import profile_logo from './Icon 4 (Users).png'
const Main=()=>{
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return(
        <>
        <div className={styles.full}>
        <nav className={styles.navbar + " navbar-expand-lg"} data-bs-theme="dark">
            <div className={styles['container-fluid']}>
            <Link className="navbar-brand" to="#"><img src={logo} alt="" height="70px" className={styles.logo}/>Home</Link></div>
            <span style={{color:'white',padding:'5px 30px',margin:'1px 1px'}}><Link to="/profile"><img src={profile_logo}></img></Link></span></nav>
            <img src={spacelogo} alt="" className={styles.centreImg}/>
            <div className={styles.bottom}><Link to="/inscribe">Inscribe</Link><Link to="/feeds">Feeds</Link><Link to="">Cluster</Link><Link onClick={handleLogout}>logout</Link></div>
    </div>
        </>
    );
}
// style={{position:'relative',color:'white',padding:'1%',marginTop:'7%'}}
export default Main;