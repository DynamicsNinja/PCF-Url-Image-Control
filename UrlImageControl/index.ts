import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class UrlImageControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	
	private _image : HTMLImageElement;

	private _imageOnError: EventListenerOrEventListenerObject;
	private _imageOnLoad: EventListenerOrEventListenerObject;

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._imageOnError = this.imageOnError.bind(this);
		this._imageOnLoad = this.imageOnLoad.bind(this);

		let imageUrl = context.parameters.imageUrl.raw || "";

		let image = document.createElement("img");
		image.addEventListener("error",this._imageOnError);
		image.addEventListener("load",this._imageOnLoad);
		image.src = imageUrl;

		this._image = image;

		container.appendChild(image);
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		let imageUrl = context.parameters.imageUrl.raw || "";
		this._image.src = imageUrl;
	}

	public getOutputs(): IOutputs
	{
		return {};
	}

	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}

	private imageOnError(){
		this._image.hidden = true;
	}

	private imageOnLoad(){
		this._image.hidden = false;
	}
}