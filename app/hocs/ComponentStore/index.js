import React from 'react';
import { connect } from 'react-redux';
import * as componentStoreActions from './actions';
import isFunction from 'lodash/isFunction';
import { INITIALIZED_SYMBOL } from './constants';
import { Map } from 'immutable';

export reducer from './reducer';

export function getComponentDisplayName(Component) {
  return (
    Component.displayName
    || Component.name
    || (typeof Component === 'string' ? Component : 'Component')
  );
}

export default (
  getInitialState = () => ({}),
  componentNameArg = (state, ownProps, Component) => getComponentDisplayName(Component),
  updateFunctionName = 'updateState',
  propName = false,
  destroyOnUnmount = false
) => (ComposedComponent) =>
  connect(
    (state, ownProps) => {
      const componentName = isFunction(componentNameArg) ? componentNameArg(state, ownProps, ComposedComponent) : componentNameArg;
      const data = state.getIn(['componentStores', componentName], Map({}));
      const initialized = data.get(INITIALIZED_SYMBOL);
      const initialState = !initialized && getInitialState(state, ownProps, data.toJS());

      return {
        data,
        initialized,
        initialState,
        componentName,
      };
    },
    componentStoreActions,
    (stateProps, dispatchProps, ownProps) => ({
      componentStore: {
        ...stateProps,
        ...dispatchProps,
      },
      ownProps,
    })
  )(
    class ComponentStore extends React.Component {
      static propTypes = {
        componentStore: React.PropTypes.object.isRequired,
        ownProps: React.PropTypes.object.isRequired,
      }

      componentWillMount() {
        const { componentStore: {
          initialize,
          initialState,
          initialized,
          componentName,
        } } = this.props;

        if (!initialized) initialize(componentName, initialState);
      }

      componentWillUnmount() {
        const { componentStore: { destroy, componentName } } = this.props;

        if (destroyOnUnmount) destroy(componentName);
      }

      render() {
        const { ownProps, componentStore: { update, data, componentName } } = this.props;
        let componentStateProps = {};

        // Wait for store to be initialized
        if (data == null || !data.get(INITIALIZED_SYMBOL)) return null;

        if (propName) {
          componentStateProps[propName] = { ...ownProps[propName], ...data.toJS() };
        } else {
          componentStateProps = {
            ...componentStateProps,
            ...data.toJS(),
          };
        }

        componentStateProps[updateFunctionName] = (...args) => update(componentName, ...args);
        componentStateProps[updateFunctionName].pureAction = (...args) => componentStoreActions.update(componentName, ...args);

        return (
          <ComposedComponent
            {...ownProps}
            {...componentStateProps}
          />
        );
      }
    }
  );
