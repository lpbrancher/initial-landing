import { useState, useEffect } from 'react'
import links from './links.js'
import './App.css'

/* open weather API config */
const apiKey = "e61aa27d22eb0b30ab346a9f6441d600";
const url = `https://api.openweathermap.org/data/2.5/weather?q=porto alegre&appid=${apiKey}&units=metric`;

console.log(links)
function App() {
  const [weatherName, setWeatherName] = useState('loading');
  const [temp, setTemp] = useState<number>(0);
  const [icon, setIcon] = useState<any>('loading');
  const [loc, setLoc] = useState('loading ...');

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Weather Icon
        //weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        setIcon(
          `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );

        // Weather name
        setWeatherName(data.weather[0].description);

        // Temperature - math.round so the number isn't fractional
        setTemp(Math.round(data.main.temp));
        setLoc(data.name);
      })

  }, [])

  return (
    <>
      <div className="wrapper flex flex-col pt-32 items-center h-screen">
        <div className="weather-container flex flex-col justify-center items-center w-fit text-center border-2 rounded-lg p-3 backdrop-blur-sm">
          {icon == 'loading' ? <h1>Loading!</h1> : <><div className="weather-icon-container"><img src={icon} alt="" className="weather-icon" /></div>
            <h3>{loc}</h3>
            <h4 className="weather-name m-0">{weatherName}</h4>
            <p>{temp}°C</p></>}
        </div>

        <div className="links-container flex mt-20 backdrop-blur-sm p-3 pt-0 border-2 rounded-lg">
          <div className="links-section">
            <h2 className="section-title">dev</h2>
            {links.dev.map((i: any) => (
              <a className='' target='_blank' key={i.key} href={i.url}>{i.title}</a>
            ))}
          </div>
          <div className="links-section">
            <h2 className="section-title">the web</h2>
            {links.web.map((i: any) => (
              <a className='' target='_blank' key={i.key} href={i.url}>{i.title}</a>
            ))}
          </div>
          <div className="links-section">
            <h2 className="section-title">personal</h2>
            {links.personal.map((i: any) => (
              <a className='' target='_blank' key={i.key} href={i.url}>{i.title}</a>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
