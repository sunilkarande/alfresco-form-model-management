package ca.ab.fm.formsmanagement;

import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import net.sf.json.xml.XMLSerializer;

import org.alfresco.error.AlfrescoRuntimeException;
import org.alfresco.repo.jscript.BaseScopableProcessorExtension;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * Extends Alfresco's JavaScript API with DLIP Utility functions.
 *
 * Refer to this class in JavaScript using the alias "JSONTools".
 *
 * @author Mike.Priest
 */
public class JSONTools extends BaseScopableProcessorExtension {

	// Commons logger
    protected static final Log logger = LogFactory.getLog(JSONTools.class);

	/**
	 * Constructor
	 */
	public JSONTools() {
	}
	/* ------------------------------------------------------------ */
	/* Public methods - available to JavaScript */
	/* ------------------------------------------------------------ */

	/**
	 * Returns a XMl object conversion of the given JSON file
	 *
	 * @param jsonObj A JSON string
	 * @return the raw xml from the conversion
	 * @throws AlfrescoRuntimeException if error calling the conversion
	 */
	public String jsonToXml(String jsonObj) {

	    JSON json = JSONSerializer.toJSON( jsonObj );
	    XMLSerializer xmlSerializer = new XMLSerializer();
	    xmlSerializer.setRootName( "Model" );
	    xmlSerializer.setTypeHintsEnabled( false );
	    xmlSerializer.setElementName( "Element" );
	    String xml = xmlSerializer.write( json );

	    return xml;
	}

	/**
	 * Returns a JSON object conversion of the given XML file
	 *
	 * @param xml A XML string
	 * @return json string
	 * @throws AlfrescoRuntimeException if error calling the conversion
	 */
	public String xmlToJson(String xml) {

		String xmlStrip = xml.replaceAll("xsi:nil=\"true\"", "");

	    XMLSerializer xmlSerializer = new XMLSerializer();
	    xmlSerializer.setTypeHintsEnabled( false );
	    xmlSerializer.setSkipNamespaces(true);
	    xmlSerializer.setRemoveNamespacePrefixFromElements(true);
	    //xmlSerializer.clearNamespaces();

	    JSON json = xmlSerializer.read( xmlStrip );

	    return json.toString();
	}

}
