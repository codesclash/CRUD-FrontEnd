import React from "react";
import Card from "./Card";
import { post } from "./testConstant";
import {shallow,configure} from 'enzyme';
import Adapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });

describe("Test <Card />", () => {
  it("Should render Card component", () => {
    const component = shallow(<Card post={post} />);
    const tree = component.debug();
    expect(tree).toMatchSnapshot();
  });
  it("Title of the post should be title-title", () => {
    const component = shallow(<Card post={post} />);
 
    expect(component.find(".card-title_des").props().children[0].props.children).toBe(post.title);
  });

  it("Description of the post should be this is a test",()=>{
    const component = shallow(<Card post={post} />);

    expect(component.find(".card-title_des").props().children[1].props.children).toBe(post.content);
  })

  it("The name of the author should be Deepak",()=>{
    const component = shallow(<Card post={post} />);

    expect(component.find("#author").text()).toBe(post.author);

  })

  it("The date should be 2021-05-31T18:30:00.000Z",()=>{
    const component = shallow(<Card post={post} />);

    expect(component.find("#date").text()).toBe(new Date(post.datePublished).toLocaleDateString())});

  it("When clicking on delete button it should delete the post",()=>{
    const component = shallow(<Card post={post} />);
    const instance = component.instance();
   
    jest.spyOn(instance,"handleClickOpen");
    console.log(component.find("#del-btn").props())
    component.find("#del-btn").props().onClick();
   
    expect(component.state("confirmDialog")).toBe(true);
  });


});