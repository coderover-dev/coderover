export function camelCaseToSnakeCase(source, target) {
    if (source == null)
        return "";

    if (source.toLowerCase() === source.toLowerCase()) {
        return source.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
    } else {
        return target;
    }
}