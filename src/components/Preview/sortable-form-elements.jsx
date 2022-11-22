import SortableElement from './sortable-element';
import PlaceHolder from './form-place-holder';
import BaseFormElements from '../Formbuilder/form-elements';
import { TwoColumnRow, ThreeColumnRow, FourColumnRow } from '../Formbuilder/multi-column';
import CustomElement from '../Formbuilder/form-elements/custom-element';

const {
  Header, Paragraph, Label, LineBreak, TextInput, NumberInput, TextArea, Dropdown, Checkboxes,
  DatePicker, RadioButtons, Image, Rating, Tags, Signature, HyperLink, HyperLink_Success, HyperLink_Fail, Download, Camera, Range,
} = BaseFormElements;

const FormElements = {};

FormElements.Header = SortableElement(Header);
FormElements.Paragraph = SortableElement(Paragraph);
FormElements.Label = SortableElement(Label);
FormElements.LineBreak = SortableElement(LineBreak);
FormElements.TextInput = SortableElement(TextInput);
FormElements.NumberInput = SortableElement(NumberInput);
FormElements.TextArea = SortableElement(TextArea);
FormElements.Dropdown = SortableElement(Dropdown);
FormElements.Signature = SortableElement(Signature);
FormElements.Checkboxes = SortableElement(Checkboxes);
FormElements.DatePicker = SortableElement(DatePicker);
FormElements.RadioButtons = SortableElement(RadioButtons);
FormElements.Image = SortableElement(Image);
FormElements.Rating = SortableElement(Rating);
FormElements.Tags = SortableElement(Tags);
FormElements.HyperLink = SortableElement(HyperLink);
FormElements.HyperLink_Success = SortableElement(HyperLink_Success);
FormElements.HyperLink_Fail = SortableElement(HyperLink_Fail);
FormElements.Download = SortableElement(Download);
FormElements.Camera = SortableElement(Camera);
FormElements.Range = SortableElement(Range);
FormElements.PlaceHolder = SortableElement(PlaceHolder);
FormElements.TwoColumnRow = SortableElement(TwoColumnRow);
FormElements.ThreeColumnRow = SortableElement(ThreeColumnRow);
FormElements.FourColumnRow = SortableElement(FourColumnRow);
FormElements.CustomElement = SortableElement(CustomElement);

export default FormElements;
