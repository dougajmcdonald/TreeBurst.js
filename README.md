TreeBurst.js
============

Tree Node Starburst Visualiser

TreeBurst.js is a JavaScript library written in typescript to generate a 'starburst' visualation of tree nodes.

A StarBurst visualisation is a derivative of a treegraph. The root node is at the centre and for each tier/node depth an additional circle is added.

In each circle the area represented by a node is the angle of it's parent node, divided by the number of children.

E.g. A root node with two children will be represented as an inner circle, and an outer circle divided into two. One half for each child.

Purpose
============

TreeBurst.js aims to provide a mechanism to visualise a set of nodes in tree structure and display these in an interactive and attractive way.

Usage
============

Provide a series of Nodes in Json format to the TreeBurst constructor and it will draw a TreeBurst to represent them.

TODO: Provide script inclusion and mechanism to pass data to constructor instructions

Data / Nodes
============

A Node is defined like this:

	{
		id?: number, // optional unique identifier
		parentId?: number, // null for root node
		title: string // the title of the node, for tooltip/label
		content: string // node content, for tooltip
		colour?: string // hex code colour of the node, chosen randomly if not provided
	}

An array of nodes should be provided to draw a TreeBurst.
