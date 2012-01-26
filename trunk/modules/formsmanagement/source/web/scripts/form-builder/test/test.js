{
    "name": "frmModel",
    "description": "Document/Image Form Data Model",
    "author": "Mike.Priest",
    "version": "1.0",
    "imports": [
        {
            "@uri": "http://www.alfresco.org/model/dictionary/1.0",
            "@prefix": "d"
        },
        {
            "@uri": "http://www.alfresco.org/model/content/1.0",
            "@prefix": "cm"
        }
    ],
    "namespaces": [
        {
            "@uri": "frm.model",
            "@prefix": "frm"
        }
    ],
    "aspects": [
        {
            "title": "FM Process",
            "visible": true,
            "namespace": "frm",
            "name": "processData",
            "properties": [
                {
                    "type": "d_text",
                    "name": "priority",
                    "title": "Priority",
                    "fieldType": "text"
                },
                {
                    "type": "d_text",
                    "name": "phn",
                    "title": "PHN TEMP",
                    "fieldType": "text",
                    "visible": false
                }
            ]
        },
        {
            "title": "Form Group",
            "visible": true,
            "namespace": "frm",
            "name": "formGroup",
            "properties": [
                {
                    "type": "d_text",
                    "name": "groupName",
                    "title": "Group Name",
                    "fieldType": "text"
                },
                {
                    "type": "d_text",
                    "name": "test",
                    "title": "Test",
                    "fieldType": "text"
                }
            ]
        },
        {
            "title": "Form Data",
            "visible": true,
            "namespace": "frm",
            "name": "formData",
            "properties": [
                {
                    "type": "d_text",
                    "name": "jsonOutput",
                    "title": "JSON Output",
                    "fieldType": "text"
                }
            ]
        }
    ]
}