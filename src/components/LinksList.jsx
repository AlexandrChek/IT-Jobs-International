import { useMatch } from 'react-router-dom';

const LinksList = ({cvsOrJobs, type}) => {
    const matchCompanyProfile = useMatch('/company_profile/:companyid');

    return (
        <div>
            {cvsOrJobs.map((item) => (
                <div key={item.id}>
                    <Link
                        to={type === 'cv'
                            ? `/public_cv/${item.id}`
                            : `/${item.countryId}/job/${item.id}`
                        }
                    >
                        <h3>
                            {item.position} {item.salary}
                        </h3>
                        <p>{item.country}, {item.city}</p>
                    </Link>
                    {matchCompanyProfile && <span>{item.status}</span>}
                </div>
            ))}
        </div>
    );
};

export default LinksList;