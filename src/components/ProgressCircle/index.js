import styles from './styles.module.scss';

const ProgressCircle = ({
    squareSize=100,
    percentage=100,
    strokeWidth=2
}) => {
    // Size of the enclosing square
    const sqSize = squareSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (sqSize - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;

    return (
        <div className={styles.circle}>
            <svg
                width={sqSize}
                height={sqSize}
                viewBox={viewBox}>
                <circle
                className={styles.circleBackground}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`} />
                <circle
                className={styles.circleProgress}
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset
                }} />
            </svg>
        </div>
      );
}

export default ProgressCircle;