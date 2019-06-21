export const getUrlParameters = (pathTemplate, queryParameters) => {
    let parameters = {};

    const searchParams = new URLSearchParams(window.location.search);
    queryParameters.forEach(key => {
        parameters = {...parameters, ...{ [key]: searchParams.get(key) }};
    });

    // const path = window.location.pathname;
    // const routeMatcher = new RegExp(pathTemplate.replace(/:[^\s/]+/g, '([\\w-]+)'));
    // const matches = routeMatcher.exec(path);
    // console.log(matches);

    return parameters;
};