<?xml version="1.0" encoding="UTF-8"?>
<!-- First namespace prefix in namespace array is used for model prefix -->
<model name="${model.namespaces[0]['@prefix']}:${model.name}" xmlns="http://www.alfresco.org/model/dictionary/1.0">

	<description>${model.description}</description>
	<author>${model.author}</author>
	<version>${model.version}</version>

	<imports>
		<#list model.imports as import><import uri="${import['@uri']!}" prefix="${import['@prefix']!}" /></#list>
	</imports>

	<namespaces>
		<#list model.namespaces as namespace><namespace uri="${namespace['@uri']!}" prefix="${namespace['@prefix']!}" /></#list>
	</namespaces>

	<aspects>
		<#list model.aspects as aspect>
		<#assign prefix = aspect.namespace />
		<aspect name="${prefix}:${aspect.name}">
			<title>${aspect.title}</title>
			<properties>
				<#list aspect.properties as property>
				<property name="${prefix}:${property.name}">
					<title>${property.title}</title>
					<type>${property.type?replace("_", ":")}</type>
				</property>
				</#list>
			</properties>
		</aspect>
		</#list>
	</aspects>
</model>