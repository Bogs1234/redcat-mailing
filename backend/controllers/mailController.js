import { sql } from "../config/db.js";

export const getMails = async (req, res) => {
    try {
        const mails = await sql`
            SELECT * FROM mails
            ORDER BY created_at DESC
        `

        console.log("fetched products", mails);
        
        res.status(200).json({
            success: true,
            data: mails
        });
    } catch (error) {
        console.log("Error getMails", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMail = async (req, res) => {
    // Get Mail   
}

export const createMail = async (req, res) => {
    const {
        reference_no,
        sender,
        recipient,
        mail_type,
        delivery_mode,
        courier,
        quantity,
        remarks,
        status,
        created_at,
        created_by
    } = req.body;

    if (
        !reference_no ||
        !sender ||
        !recipient ||
        !mail_type ||
        !delivery_mode ||
        !courier ||
        !quantity ||
        !remarks ||
        !status ||
        !created_at ||
        !created_by
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const newMail = await sql`
            INSERT INTO mails (
                reference_no,
                sender,
                recipient,
                mail_type,
                delivery_mode,
                courier,
                quantity,
                remarks,
                status,
                created_at,
                created_by
            )
            VALUES (
                ${reference_no},
                ${sender},
                ${recipient},
                ${mail_type},
                ${delivery_mode},
                ${courier},
                ${quantity},
                ${remarks},
                ${status},
                ${created_at},
                ${created_by}
            )
            RETURNING *
        `

        console.log("New Mail Added: ", newMail);
        res.status(201).json({ success: true, data: newMail[0] });
    } catch (error) {
        console.log("Error createMails", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateMail = async () => {
    // Update Mail
}

export const deleteMail = async () => {
    // Update Mail
}


// app.get("/api/mails", (req, res) => {
//     // GET ALL mails from the DB

//     res.status(200).json({
//         success: true,
//         data: [
//             {
//                 reference_no: "M001",
//                 from_id: "1",
//                 to_id: "1",
//                 mail_type: "1",
//                 quantity: "1",
//                 delivery_mode: "1",
//                 courier_id: "1",
//                 remarks: "test mail 1",
//                 mail_status: "1",
//                 created_by: "1",
//                 created_date: "",
//                 edited_by: "1",
//                 edited_date: ""
//             }
//         ]
//     });
// })