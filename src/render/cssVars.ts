const camelToKebab = string =>
    string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

export default (node, props) => {
    const setProperties = () => {
        Object.entries(props).forEach(([key, value]) => {
            if (value || value === 0) {
                node.style.setProperty(`--${camelToKebab(key)}`, value)
            }
        })
    }

    setProperties()

    return {
        update(new_props) {
            Object.keys(props)
                .filter(p => !new_props[p])
                .forEach(name =>
                    node.style.removeProperty(`--${camelToKebab(name)}`)
                )

            props = new_props
            setProperties()
        }
    }
}
