import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import Header from './Header'
import './airline.css'
import ReviewForm from "./ReviewForm";

const Airline = (props) => {
  const [airline,
    setAirline] = useState({})
  const [review,
    setReview] = useState({})
  const [loaded,
    setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;
    axios
      .get(url)
      .then(resp => {
        setAirline(resp.data)
        setLoaded(true)
      })
      .catch(data => console.log('Error', data))
  }, []);

  const handleChange = (e) => {
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value }))
    console.log(review);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const airline_id = airline.data.id;

    const csrfToken = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    axios.post('/api/v1/reviews', {review, airline_id})
    .then(resp => {
      const included = [...airline.included, resp.data]
      setAirline({...airline, included})
      setReview({title: '', description: '', score: 0})
    })
    .catch()
  }

  return (
    <div className='wrapper'>
      {loaded && <Fragment>
        <div className='column'>
          <div className='main'>
            <Header data={airline.data.attributes} reviews={airline.included}/>
            <div className='reviews'></div>
          </div>
        </div>
        <div className='column'>
          <ReviewForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            attributes={airline.data.attributes}
            review={review}/>
        </div>
      </Fragment>
}
    </div>
  )
}

export default Airline