import './LoadingSpinner.scss';

type LoadingSpinnerProps = {
    title: string;
    thickness?: number;
    colour?: string;
    backgroundColour?: string;
    foregroundColour?: string;
}
const LoadingSpinner = ({ title = "Loading...", thickness = 4, colour = "black", backgroundColour = "#facee6", foregroundColour = "#ec439f" }: LoadingSpinnerProps) => {
    return (
        <div className='loading-spinner' style={{ color: colour, }}>
            <div className='spinner'
                style={{
                    borderTop: `${thickness}px solid ${backgroundColour}`,
                    borderRight: `${thickness}px solid ${backgroundColour}`,
                    borderBottom: `${thickness}px solid ${backgroundColour}`,
                    borderLeft: `${thickness * 2}px solid ${foregroundColour}`,
                }} />
            <p>{title}</p>
        </div>
    )
}

export default LoadingSpinner