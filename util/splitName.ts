export const getOnlyName = (text: string) =>  {
    const name = text.split('(');
    return name[0].trim();
}

export const getCity = (job: string, country: string) => {
    const name = job.split('(');
    if(name.length > 1){
        return `${name[1].replace(")", "").trim()} - ${country}`;
    }else {
        return country
    }
}
