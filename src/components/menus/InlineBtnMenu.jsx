import styles from '../../styles/components/menus/InlineBtnMenu.module.css';

const InlineBtnMenu = ({ menuData, newClass = null }) => {
  return (
    <nav className={`inlineCenteredFlexBox ${newClass}`}>
      {menuData.map(item => (
        <button key={item.text} className="standardButton" onClick={item.fn}>
          {item.text}
        </button>
      ))}
    </nav>
  );
};

export default InlineBtnMenu;
