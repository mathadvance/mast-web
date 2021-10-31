import formidable from "formidable"
export default async (req, res) => {
    const form = formidable({ multiples: true })
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).send(err);
        }
    })
    res.status(200).send("")
};

export const config = {
    api: {
        bodyParser: false,
    }
}