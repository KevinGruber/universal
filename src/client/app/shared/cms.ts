export interface CMSSlot {
	type: string;
	visible: boolean;
	text: any;
	image: string;
	slots: Array<CMSSlot>;
}


export interface CMSData {
	id: string;
	slots: Array<CMSSlot>;
}
