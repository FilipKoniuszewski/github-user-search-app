import "./index.css";
import themeLight from "./Images/icon-moon.svg";
import themeDark from "./Images/icon-sun.svg";
import glassImage from "./Images/icon-search.svg";
import defaultUser from "./Images/583231.png";
import locationImage from "./Images/icon-location.svg";
import twitterImage from "./Images/icon-twitter.svg";
import websiteImage from "./Images/icon-website.svg";
import clanImage from "./Images/icon-company.svg";
import {useState} from "react";


function App() {
    const [theme, setTheme] = useState('light')
    
    const [userInput, setUserInput] = useState("")
    
    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }
    
    function HandleSubmit(e) {
        e.preventDefault()
    }
    
    
    return (
        <div className="App" data-theme={theme}>
            <div className="wrapper">
                <div className="header-theme-section">
                    <h1 className="header">
                        devfinder
                    </h1>
                    <div className="dark-theme-toggle" onClick={changeTheme}>
                        <span>{theme === 'light' ? 'Dark' : 'light'}</span>
                        <img src={theme === 'light' ? themeLight : themeDark} alt="" />
                    </div>
                </div>
                <div className="user-section">
                    <form className="search">
                        <div>
                            <img src={glassImage} alt="" />
                            <label htmlFor="username" />
                            <input type="text"
                                   id="username"
                                   placeholder="Search GitHub username…"
                                   autoComplete="off"
                                   value={userInput}
                                   onChange={e => setUserInput(e.target.value) }/>
                        </div>
                        <input type="submit"
                               name="submit"
                               id="submit"
                               onClick={(e) => HandleSubmit(e)}
                               value="Search"/>
                    </form>
                    <div className="result-section">
                        <img src={defaultUser} alt="" />
                        <div className="user-info-section">
                            <div className="user-name">
                                <h1 className="name">
                                    The Octocat
                                </h1>
                                <div className="joined-date">
                                    Joined 25 Jan 2011
                                </div>
                            </div>
                            <h3 className="user-nick">
                                @octocat
                            </h3>
                            <div className="bio">
                                This profile has no bio
                            </div>
                            <div className="statistics">
                                <div className="repos-count">
                                    <h4 className="heading">
                                        Repos
                                    </h4>
                                    <h2 className="count">
                                        8
                                    </h2>
                                </div>
                                <div className="followers-count">
                                    <h4 className="heading">
                                        Followers
                                    </h4>
                                    <h2 className="count">
                                        3938
                                    </h2>
                                </div>
                                <div className="following-count">
                                    <h4 className="heading">
                                        Following
                                    </h4>
                                    <h2 className="count">
                                        9
                                    </h2>
                                </div>
                            </div>
                            <div className="additional-info__grid-section">
                                <div className="location">
                                    <img src={locationImage} alt="" />
                                    <span>San Francisco</span>
                                </div>
                                <div className="twitter-link">
                                    <img src={twitterImage} alt="" />
                                    <span>Not Available</span>
                                </div>
                                <div className="website-link">
                                    <img src={websiteImage} alt="" />
                                    <a href="https://github.blog" target="_blank">https://github.blog</a>
                                </div>
                                <div className="clan">
                                    <img src={clanImage} alt="" />
                                    <span>@github</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  );
}

export default App;
