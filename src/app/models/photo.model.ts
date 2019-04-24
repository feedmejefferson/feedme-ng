export class Photo {
    id: string;
    imageUrl: URL;
    title: string;
    author: string;
    authorProfileUrl: URL;
    originTitle: string;
    originUrl: URL;
    license: string;
    licenseUrl: URL;
    isTags: string[];  // what food is this -- i.e. pizza
    containsTags: string[];  // what other foods does this food contain -- i.e. peperroni
    describedAsTags: string[];  // how else would you describe this food -- i.e. italian, comfort
}
