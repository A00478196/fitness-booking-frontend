import React from 'react'
import Button from '../components/common/Button'
import home from "../assets/home.png"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className='container-fluid home'>
        <div className='row'>
        <div class="col-lg-6 col-md-7 col-sm-12 bg-white vh-100 text-start postion-relative p-0">
              <div className="details">
                <span className="text-left text-muted">
                  Find your inner peace
                </span>
                <h1 className="main-heading w-75 mb-4"> Mental and Physical Fitness</h1>

                <Button 
                text="Find our Programs"
                color="black"
                textColor="white"
                onClick={()=>navigate('/programs')}
                />  
              </div>
            </div>
            <div className='col-lg-6 col-md-6 vh-100'>
                <div className='homeImg'>
                <img src={home}
                   
                    />
                </div>
                   
            </div>
        </div>
    </div>
    </>
  )
}

export default Home