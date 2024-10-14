export const processArgs = async (targetFields = []) => {
    const args = process.argv.slice(2);

    const [props, values, target] = args.reduce(
        (acc, arg, index, arr) => {
            const isProp = arg.startsWith("-");

            let isLast = index == arr.length - 1;

            const value = !isLast
                ? arr[index + 1].startsWith("-")
                    ? true
                    : arr[index + 1]
                : true;

            if (isProp) {
                const prop = arr[index].replace(/^\-{1,2}/, "");
                if (targetFields.includes(prop)) acc[2][prop] = value;
                acc[0][prop] = value;
            } else {
                const prevArg = arr[index - 1];
                const isPrevProp = prevArg != null && prevArg.startsWith("-");
                if (!isPrevProp) acc[1].push(arg);
            }

            return acc;
        },
        [{}, [], {}]
    );

    return { props, values, target };
};
