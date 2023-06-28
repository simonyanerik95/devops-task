This repository contains a Node.js application with an HTTP-API service for reading book data. The application is built with a Prometheus counter/gauge, using Prometheus client libraries to provide information in /metrics.

Docker
Build
To build the Docker image of the application, use the following command:

docker build -t <your-image-name> .


Run
To run the Docker image, execute the following command:

docker run -p 3000:3000 <your-image-name>


You can then access the application on http://localhost:3000 in your web browser.

Testing Docker Image
To test the Docker image, follow the steps below:

To test the Docker container specified in the given docker-test.yaml configuration file, you can use dgoss for executing commands and asserting expected output.

Deploying the Application
Prerequisites
Before deploying the application, ensure you have the following prerequisites:

A running Kubernetes cluster
kubectl and helm installed and configured to interact with your cluster
Enforce Security Policies with Gatekeeper
To enforce security policies with Gatekeeper, follow these steps:

--Add the Gatekeeper chart repository to your Helm client:

helm repo add gatekeeper https://open-policy-agent.github.io/gatekeeper/charts

--Install Gatekeeper to your cluster in a chosen namespace:

helm install gatekeeper/gatekeeper --generate-name -n <namespace>

Applying the Constraints
In the root directory of the application, you will find two constraint templates YAML files. Apply them to your Minikube cluster using the following command:

kubectl apply -f <filename>

Replace <filename> with the actual filename of the constraint template.

Enforcing Constraints
In the root directory, you can find two constraint YAML files. Apply them using the following command to enforce the constraints for your cluster:

kubectl apply -f <filename>

Replace <filename> with the actual filename of the constraint.

Push to Repository
Assuming you have already configured your Minikube cluster to be able to pull images from the Minikube local repository, follow these steps:

Install the Helm chart:

Set your current directory to the helm-chart directory:

Make the necessary changes in your manifest files and provide your own values in the values.yaml file.

Install the Helm chart:
helm install <release-name> . -n <namespace>


Replace <release-name> with a name for your Helm release and <namespace> with a name for your namespace.

Finally, install an Ingress controller and test the application using the provided domain endpoint in the Ingress file.


