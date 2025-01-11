import './ParentHome.css';

const ParentHome = () => {
return (
    <div className="parentHome">
    <h1>Welcome, Parent!</h1>

    <div className="parentOptions">
        <button className="parentButton" onClick={() => alert('View Child Progress')}>
        View Child&apos;s Progress
        </button>
        <button className="parentButton" onClick={() => alert('Manage Account')}>
        Manage Account
        </button>
        <button className="parentButton" onClick={() => alert('Contact Support')}>
        Contact Support
        </button>
    </div>

    <div className="parentInfo">
        <p>
        As a parent, you can monitor your child&apos;s progress, manage account settings, and reach out to our support team for assistance.
        </p>
    </div>
    </div>
);
};

export default ParentHome;