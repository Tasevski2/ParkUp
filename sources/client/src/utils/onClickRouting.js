export default function onClickRouting(path, history) {
    const currentPath = history.location.pathname;
    if (currentPath === path) {
        history.replace(path);
        return;
    }
    history.push(path);
};

