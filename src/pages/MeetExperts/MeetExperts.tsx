import './MeetExperts.scss';
import useGetUsers from '../../hooks/useGetUsers';
import { LoadingSpinner } from '../../components';
import ExpertCard from './ExpertCard/ExpertCard';

const MeetExperts = () => {
    const { getAllMembersOfLashShack, loadingUsers } = useGetUsers();


    return (
        <section id="team" className="experts__section">
            <h5 className="text-center mb-2">Meet The Experts</h5>
            <h1 className="text-center mb-4">Our professional team</h1>

            {loadingUsers ? (
                <LoadingSpinner title="Loading..." />
            ) : (
                <div className="list">
                    {getAllMembersOfLashShack?.map(({ firstName, position, photoURL, summary }, key) => (
                        <ExpertCard
                            key={key}
                            id={key}
                            firstName={firstName}
                            position={position}
                            photoURL={photoURL}
                            message={summary}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}

export default MeetExperts