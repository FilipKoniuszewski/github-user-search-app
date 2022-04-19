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
    const [theme, setTheme] = useState('dark')
    
    const [userInput, setUserInput] = useState("")
    
    const [isNotValidInput, setIsNotValidInput] = useState(false);
    
    const [searchedUserData, setSearchedUserData] = useState({
        username: "The Octocat",
        date: "25 Jan 2011",
        nick: "octocat",
        bio: "This profile has no bio",
        repos: 8,
        followers: 3938,
        following: 9,
        location: "San Francisco",
        twitter: "Not Available",
        website: "https://github.blog",
        clan: "github",
        avatar: defaultUser,
        reposUrl: ""
    })
    
    function changeTheme() {
        if (theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }
    
    function RaiseError() {
        setIsNotValidInput(true)
    }
    
    async function HandleSubmit(e) {
        e.preventDefault()
        if (userInput !== "") {
            let response = await fetch(`https://api.github.com/users/${userInput}`)
                .then(response => {
                    if (response.ok) {
                        let data = response.json()
                            .then(data => {
                                console.log(data)
                                setSearchedUserData({
                                    username: data.name,
                                    date: data.created_at,
                                    nick: data.login,
                                    bio: data.bio,
                                    repos: data.public_repos,
                                    followers: data.followers,
                                    following: data.following,
                                    location: !data.location ? 'disabled' : data.location,
                                    twitter: !data.twitter_username ? 'disabled' : data.twitter_username,
                                    website: !data.blog ? 'disabled' : data.blog,
                                    clan: !data.company ? 'disabled' : data.company,
                                    avatar: data.avatar_url,
                                    reposUrl: data.repos_url
                                })
                            })
                    }
                    else {
                        RaiseError();
                    }
                })
        }
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
                                   onChange={e => {
                                       setUserInput(e.target.value) 
                                       setIsNotValidInput(false);
                                   }}/>
                        </div>
                        <div>
                            <div className={`error ${isNotValidInput ? `active-error` : 'inactive-error'}`}>
                                No Results
                            </div>
                            <input type="submit"
                                   name="submit"
                                   id="submit"
                                   onClick={(e) => HandleSubmit(e)}
                                   value="Search"/>
                        </div>
                    </form>
                    <div className="result-section">
                        <img src={searchedUserData.avatar} alt="" />
                        <div className="user-info-section">
                            <div className="user-name">
                                <h1 className="name">
                                    {searchedUserData.username}
                                </h1>
                                <div className="joined-date">
                                    Joined {new Intl.DateTimeFormat('en-GB',{year:"numeric", month:"short",day:"2-digit"}).format(new Date(searchedUserData.date)).split(" ").join(" ")}
                                </div>
                            </div>
                            <h3 className="user-nick">
                                @{searchedUserData.nick}
                            </h3>
                            <div className="bio">
                                {searchedUserData.bio}
                            </div>
                            <div className="statistics">
                                <div className='repos-count'>
                                    <h4 className="heading">
                                        Repos
                                    </h4>
                                    <h2 className="count">
                                        {searchedUserData.repos}
                                    </h2>
                                </div>
                                <div className="followers-count">
                                    <h4 className="heading">
                                        Followers
                                    </h4>
                                    <h2 className="count">
                                        {searchedUserData.followers}
                                    </h2>
                                </div>
                                <div className="following-count">
                                    <h4 className="heading">
                                        Following
                                    </h4>
                                    <h2 className="count">
                                        {searchedUserData.following}
                                    </h2>
                                </div>
                            </div>
                            <div className="additional-info__grid-section">
                                <div className={`location ${searchedUserData.location === 'disabled' && 'not-available'}`}>
                                    <img src={locationImage} alt="" />
                                    {searchedUserData.location === 'disabled'
                                        ? <span>Not Available</span>
                                        : <span>{searchedUserData.location}</span>}
                                </div>
                                <div className={`twitter-link ${(searchedUserData.twitter === 'disabled' || searchedUserData.username === "The Octocat") && 'not-available'}`}>
                                    <img src={twitterImage} alt="" />
                                    {searchedUserData.twitter === 'disabled' || searchedUserData.twitter === 'Not Available'
                                        ? <span>Not Available</span>
                                        : <span>{searchedUserData.twitter}</span>}
                                </div>
                                <div className={`website-link ${searchedUserData.website === 'disabled' && 'not-available'}`}>
                                    <img src={websiteImage} alt="" />
                                    {searchedUserData.website === 'disabled'
                                        ? <span>Not Available</span>
                                        : <a href="https://github.blog" target="_blank">{searchedUserData.website}</a>}
                                </div>
                                <div className={`clan ${searchedUserData.clan === 'disabled' && 'not-available'}`}>
                                    <img src={clanImage} alt="" />
                                    {searchedUserData.clan === 'disabled' 
                                        ? <span>Not Available</span> 
                                        : <span>@{searchedUserData.clan}</span>}
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
