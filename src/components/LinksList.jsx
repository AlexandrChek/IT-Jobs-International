import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import PositionAndSalaryOutput from './output_components/PositionAndSalaryOutput';
import styles from '../styles/components/LinksList.module.css';

const LinksList = ({ cvsOrJobs, type, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 0);

  const { currentItems, pageCount } = useMemo(() => {
    const passedItems = currentPage * itemsPerPage;
    const currentItems = cvsOrJobs.slice(passedItems, passedItems + itemsPerPage);
    const pageCount = Math.ceil(cvsOrJobs.length / itemsPerPage);
    return { currentItems, pageCount };
  }, [JSON.stringify(cvsOrJobs), currentPage, itemsPerPage]);

  const getRoute = item => {
    return type === 'cv' ? `/cv/${item.seekerId}/public` : `/${item.companyId}/job/${item.jobId}`;
  };

  const handlePageChange = ({ selected }) => setSearchParams({ page: selected.toString() });

  return (
    <div>
      {currentItems.map((item, index) => (
        <div key={index} className={styles.listItem}>
          <Link to={getRoute(item)}>
            <h3>
              <PositionAndSalaryOutput position={item.position} salary={item.salary} />
            </h3>
            {item.country && <p>{`${item.country}${item.city ? `, ${item.city}` : ''}`}</p>}
            {type === 'job' && item.isDisabled && <h4>Disabled</h4>}
          </Link>
        </div>
      ))}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel="&#11164;"
          nextLabel="&#11166;"
          pageCount={pageCount}
          pageRangeDisplayed={5}
          forcePage={currentPage}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          pageLinkClassName={styles.pageLink}
          activeLinkClassName={styles.active}
          previousLinkClassName={styles.previousLink}
          nextLinkClassName={styles.nextLink}
          disabledLinkClassName={styles.disabled}
        />
      )}
    </div>
  );
};

export default LinksList;
