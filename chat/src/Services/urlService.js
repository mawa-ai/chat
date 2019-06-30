export const getUrlParameters = (pathTemplate, queryParameters = []) => {
    let parameters = {};

    const searchParams = new URLSearchParams(window.location.search);
    queryParameters.forEach(key => {
        const value = searchParams.get(key);

        if (value !== null) {
            parameters = { ...parameters, ...{ [key]: value } };
        }
    });

    const path = window.location.pathname;
    const pathPattern = new RegExp(pathTemplate.replace(/:(\w+)/g, '(?<$1>[\\w-]+)'));
    const matches = pathPattern.exec(path);

    if (matches) {
        parameters = { ...parameters, ...matches.groups };
    }

    return { parameters, match: !!matches };
};