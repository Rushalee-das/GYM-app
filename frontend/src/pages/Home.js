import { useEffect, useState } from "react"
import WorkoutsDetails from "../components/WorkoutsDetails"
import { WorkoutForm } from "../components/WorkoutForm"

const Home = () => {
    const [workouts , setWorkouts] = useState(null)
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workout')
            const json = await response.json()

            if (response.ok)
            {
                setWorkouts(json)
            }
        }
        fetchWorkouts()
    }, [])
  return (
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) =>(
                <WorkoutsDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home