export function Content(props) {
    return (
        <main>
            {props.text}
            {props.children}
        </main>
    );
}