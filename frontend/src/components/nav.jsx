import {Link} from 'react-router-dom';

export default function Navigation() {
    return (
        <header>
            <div className="cont">
                <Link to = '/'>
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </header>
    )
}